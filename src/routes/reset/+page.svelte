<script lang='ts'>
    import { page } from '$app/stores';
    import type { ActionData } from './$types';
    export let form:ActionData;

    let del=false;
</script>

<svelte:head>
    <title>豆腐創作活動研究会|リセット</title>
    <meta name='description' content='豆腐創作活動研究会の問題の進捗を削除します。'>
</svelte:head>

<div class='hero min-h-screen fixed top-0 -z-10'>
    <div class='hero-content flex-col md:flex-row-reverse'>
        {#if $page.data.session}
            <div class='text-center lg:text-left'>
                <h1 class='text-5xl font-bold'>Reset</h1>
                <p class='py-6'>問題の進捗を削除します。</p>
            </div>
            <div class='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200'>
                <div class='card-body'>
                    <form method='post'>
                        <div class='form-control'>
                            <label class='label' for='name'>
                                <span class='label-text'>削除する</span>
                            </label>
                            <input type='checkbox' name='delete' class='checkbox' id='name' bind:value={del}/>
                        </div>
                        <div class='form-control mt-6'>
                            <button class='btn btn-primary' disabled={!del}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        {:else}
            <div class='text-center lg:text-left'>
                <h1 class='text-5xl font-bold'>Profile</h1>
                <p class='py-6'>ログインしてください</p>
            </div>
            <div class='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200'>
                <div class='card-body'>
                    <div class='form-control'>
                        <label for='signInModal' class='btn btn-primary'>Sign In</label>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
<div class='toast'>
    {#if form?.success}
        <div class='w-96 alert alert-success'>
            <span>{form.message}</span>
        </div>
    {/if}
</div>