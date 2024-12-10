<form class="h-full">
	<label class="w-full h-full flex flex-col justify-evenly md:max-w-xs mx-auto">
		<div>
			<div class="label">
				<span class="label-text">Username</span>
			</div>
			<input type="text" placeholder="username" class="input input-bordered input-primary w-full" name="username" autocomplete="username" required/>
			<div class="label">
				<span class="label-text-alt"><!--Error message location--></span>
			</div>
		</div>
		<div>
			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input type="password" placeholder="password" class="input input-bordered input-primary w-full" name="password" autocomplete="current-password" required/>
			<div class="label">
				<span class="label-text-alt"><!--Error message location--></span>
				<span class="label-text-alt">
					<a href="/auth/security">Forgot your password?</a>
				</span>
			</div>
		</div>
		<div>
			<input type="submit" class="btn btn-active btn-primary px-[20%] float-right" on:click={()=>{}/* placeholder... Function to validate and send via fetch request */ }/>
		</div>
	</label>
</form>