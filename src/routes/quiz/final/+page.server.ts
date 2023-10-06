import type {Actions, PageServerLoad} from './$types';
import {drizzle} from 'drizzle-orm/d1';
import {answers, participants, results} from '$lib/schema';
import {error, fail, redirect} from '@sveltejs/kit';
import {eq, sql} from 'drizzle-orm';

//ここを変更
const q = 'final';
const ans: {
    [key: number]: string;
} = {
    1: 'そうけんのあおいかみ',
    2: 'Intermediate',
    3: 'つばめ'
};
//ここを変更

export const load: PageServerLoad = async ({locals}) => {

    const db = drizzle(locals.DB);
    const session = await locals.getSession();
    if (!session?.user) throw error(401, 'Unauthorized');
    const {course, start} = await db
        .select({
            course: participants.course,
            start: participants.start
        })
        .from(participants)
        .where(eq(participants.userId, session.user.id))
        .get()
        .then((v) => v ?? {course: null, start: null});

    if (!course || !start) throw error(400, 'You are not enrolled in any course');
    if (course === 2||course===4) {
        const penalty = await db.select({
            count: sql<number>`count(*)`
        }).from(answers).where(eq(answers.userId, session.user.id)).then((v) => v[0]?.count ?? 0);
        await db.delete(participants).where(eq(participants.userId, session.user.id));
        await db.delete(answers).where(eq(answers.userId, session.user.id));
        await db.insert(results).values({
            userId: session.user.id,
            course,
            totalTime: new Date().getTime() - start.getTime(),
            start,
            end: new Date(),
            penalty: penalty - 10
        });
        //AC
        throw redirect(302, `/result/${course}`)
    }else {
        const fans = await db.selectDistinct({
            question: answers.question
        }).from(answers).where(eq(answers.userId, session.user.id));
        if(fans.length>=5){
            return {}
        }else {
            throw error(400, 'すべての問題をクリアしてください');
        }
    }
}

export const actions: Actions = {
    default: async ({request, locals}) => {
        const db = drizzle(locals.DB);
        const session = await locals.getSession();
        if (!session?.user) throw error(401, 'Unauthorized');
        const formData = await request.formData();

        const answer = formData.get('answer');
        if (answer instanceof File) throw error(400, 'Bad request');
        if (!answer) throw error(400, 'answer is required');

        const {course, start} = await db
            .select({
                course: participants.course,
                start: participants.start
            })
            .from(participants)
            .where(eq(participants.userId, session.user.id))
            .get()
            .then((v) => v ?? {course: null, start: null});
        if (!course || !start) throw error(400, 'You are not enrolled in any course');

        if (ans[course] !== answer) {
            //WA
            return fail(400, {
                answer,
                message: 'Wrong answer'
            });
        } else {
            const penalty = await db.select({
                count: sql<number>`count(*)`
            }).from(answers).where(eq(answers.userId, session.user.id)).then((v) => v[0]?.count ?? 9) - 10;

            await db.delete(participants).where(eq(participants.userId, session.user.id));
            await db.delete(answers).where(eq(answers.userId, session.user.id));
            await db.insert(results).values({
                userId: session.user.id,
                course,
                totalTime: new Date().getTime() - start.getTime(),
                start,
                end: new Date(),
                penalty
            });
            //AC
            throw redirect(302, `/result/${course}`)
        }
    }
};
