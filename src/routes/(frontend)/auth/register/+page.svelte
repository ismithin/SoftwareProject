<script>
	let step = $state(1);
	let MAX_STEP = 2;
</script>
<!--
     Note to self: Please finish making the multi-step form component... Also add loading component when making requests...
     Additionally, the current flow allows for usernames to be taken while the user is in the registering process. Maybe
	 make some kind of username reservation system for users who are in the middle of registering.
-->
<form class="h-full">
	<label class="form-control w-full h-full flex flex-col justify-evenly md:max-w-xs mx-auto">
		{#if step==1}
			<div>
				<div class="label">
					<span class="label-text">Username</span>
				</div>
				<input type="text" placeholder="username" class="input input-bordered input-primary w-full" name="username" autocomplete="username" required/>
				<div class="label">
					<span class="label-text-alt"><!--Error message location--></span>
				</div>
			</div>
		{:else}
			<!--
			     There is a bug that makes this need to be the end of the form.
			     Idk how to fix it, and luckily I don't really need to, but
				 ideally that should be fixed at some point.
			 -->
			<div>
				<div class="label">
					<span class="label-text">Password</span>
				</div>
				<input type="password" placeholder="password" class="input input-bordered input-primary w-full" required/>
				<div class="label">
					<span class="label-text-alt"><!--Error message location--></span>
				</div>
			</div>
			<div>
				<div class="label">
					<span class="label-text">Confirm Password</span>
				</div>
				<input type="password" placeholder="password" class="input input-bordered input-primary w-full" required/>
				<div class="label">
					<span class="label-text-alt"><!--Error message location--></span>
				</div>
			</div>
		{/if}
		<div class="join join-horizontal w-full flex">
			<!-- TODO: Add validation logic. -->
			{#if step!=1}
				<button class="btn btn-secondary hover:btn-outline active:btn-outline join-item flex-1" onclick={()=>{step--}}>Previous</button>
			{/if}
			{#if step!=MAX_STEP}
				<button class="btn btn-primary hover:btn-outline active:btn-outline join-item flex-1" onclick={()=>{step++}}>Next</button>
			{/if}
			{#if step==MAX_STEP}
				<input type="submit" class="btn btn-primary hover:btn-outline active:btn-outline join-item flex-1" />
			{/if}
		</div>
	</label>
</form>