<script lang='ts'>
    import '../app.postcss';
    import {page} from '$app/stores';
    import {signIn, signOut} from '@auth/sveltekit/client';
    import Icon from '@iconify/svelte';
</script>
<div class="drawer">
    <input id="sidebar" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content">
        <div class='navbar bg-base-200 mb-2'>
            <div class='navbar-start gap-1'>
                <label for="sidebar" class='btn btn-ghost p-1'>
                    <Icon icon='mdi:menu' class='w-10 h-10'/>
                </label>
                <a class='btn btn-ghost normal-case text-xl' href='/'>
                    <img src='/logo.png' alt='logo' class='h-10 w-10 mr-2'>
                    創作活動研究会</a>
            </div>
            <div class='navbar-end'>
                <div class='dropdown dropdown-end'>
                    <label tabindex='0' class='btn btn-ghost btn-circle avatar'>
                        <div class='w-10 rounded-full'>
                            {#if $page.data.session && $page.data.session.user?.image}
                                <img src={$page.data.session.user.image} alt='icon'/>
                            {:else }
                                <Icon icon='mdi:account' class='w-10 h-10'/>
                            {/if}
                        </div>
                    </label>
                    <ul tabindex='0'
                        class='menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-200 rounded-box w-52 gap-1'>
                        {#if $page.data.session && $page.data.session.user}
                            <li>
                                <a href='/profile'>
                                    <Icon icon='mdi:account' class='w-6 h-6 mr-2'/>
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href='/reset'>
                                    <Icon icon='mdi:account-remove' class='w-6 h-6 mr-2'/>
                                    reset
                                </a>
                            </li>
                            <li>
                                <button on:click={signOut}>Logout</button>
                            </li>
                        {:else}
                            <li><label for="signInModal">SignIn</label></li>
                        {/if}
                    </ul>
                </div>
            </div>
        </div>
        <slot/>
    </div>
    <div class="drawer-side z-50">
        <label for="sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>サイドバーに表示できるほど作ってない</li>
            <li><a href='/result'>リザルト画面</a></li>
        </ul>
    </div>
</div>


<input type="checkbox" id="signInModal" class="modal-toggle"/>
<div class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Choose signIn method</h3>
        <div class="divider"/>
        <div class="flex gap-4">
            <button class="btn btn-primary" on:click={()=>signIn("google")}>Google</button>
            <button class="btn btn-primary" on:click={()=>signIn("line")}>LINE</button>
        </div>
    </div>
    <label class="modal-backdrop" for="signInModal"/>
</div>