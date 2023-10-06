<script lang="ts">
    export let image: string | null = null;
    export let questionnaire: string ="回答を選択してください";
</script>
<div class='w-screen min-h-screen flex flex-col gap-4 mt-10 md:px-8 sm:px-4 px-2'>
    <div class='w-full h-96 bg-base-200'>
        {#if image}
            <img src={image} alt="quiz" class='h-full mx-auto object-contain'/>
        {/if}
    </div>
    <div class='w-full h-full grid grid-cols-1 md:grid-cols-2'>
        <div class='min-h-12'>
            <h1><slot name="quiz"/></h1>
        </div>
        <div class='card bg-primary text-primary-content'>
            <div class='card-body'>
                <h2 class='card-title'>{questionnaire}</h2>
                <slot/>
            </div>
        </div>
    </div>
</div>
