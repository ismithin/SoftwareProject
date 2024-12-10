<script>
	let step = $state(1);
	let MAX_STEP = 3;
</script>
<!-- Note to self: please finish making the multi-step form component... Also add loading component when making requests...-->
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
		{:else if step==2}
		<!-- User question check. -->
			<div>
				<div class="label">
					<span class="label-text text-xl">{"Question?"}</span>
				</div>
			</div>
			<div>
				<div class="label">
					<span class="label-text">Security question answer</span>
				</div>
				<input type="text" placeholder="answer" class="input input-bordered input-primary w-full" name="security-question" required/>
				<div class="label">
					<span class="label-text-alt"><!--Error message location--></span>
				</div>
			</div>
		{:else}
			<div class="hidden">
				<div class="label">
					<span class="label-text">Username</span>
				</div>
				<input type="text" placeholder="username" class="input input-bordered input-primary w-full" name="username-iterate" autocomplete="username" required/>
				<div class="label">
					<span class="label-text-alt"><!--Error message location--></span>
				</div>
			</div>
			<div>
				<div class="label">
					<span class="label-text">Password</span>
				</div>
				<input type="password" placeholder="password" class="input input-bordered input-primary w-full" name="new-password" autocomplete="new-password" required/>
				<div class="label">
					<span class="label-text-alt"><!--Error message location--></span>
				</div>
			</div>
			<div>
				<div class="label">
					<span class="label-text">Confirm Password</span>
				</div>
				<input type="password" placeholder="password" class="input input-bordered input-primary w-full" name="new-password-confirm" autocomplete="new-password" required/>
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