<script lang="ts">


    const works=[
        {
            id:"work-1",
            image:"https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
            name:"作品名",
            creator:"作者名",
            description:"ここにちょっとした詳細"
        },
        {
            id:"work-2",
            image:"https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
            name:"作品名",
            creator:"作者名",
            description:"ここにちょっとした詳細"
        },
        {
            id:"work-3",
            image:"https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
            name:"作品名",
            creator:"作者名",
            description:"ここにちょっとした詳細"
        },
        {
            id:"work-4",
            image:"https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
            name:"作品名",
            creator:"作者名",
            description:"ここにちょっとした詳細"
        },
        {
            id:"work-5",
            image:"https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
            name:"作品名",
            creator:"作者名",
            description:"ここにちょっとした詳細"
        }
    ]
</script>

<div class="max-w-4xl mx-auto py-10">
    <h1 class="text-6xl mb-10">Works</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {#each works as work}
            <div class="card bg-base-100 shadow-xl">
                <figure><img src={work.image} alt="作品画像"/></figure>
                <div class="card-body p-4">
                    <h2 class="card-title">{work.name}</h2>
                    <h3>{work.creator}</h3>
                    <p>{work.description}</p>
                    <div class="card-actions justify-end">
                        <a href="/works/{work.id}" class="btn btn-sm btn-primary">詳細</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
<slot/>