<script>
  import Input from "../lib/Input.svelte";
  import Button from "../lib/Button.svelte";
  let email = "";
  let password = "";
  let confirmPassword = "";

  function validatePassword(password, confirmPassword) {
    return password.length<=0 || confirmPassword !== password;
  }
</script>
<form class="space-y-5 {$$props.class}">
  <Input
    label="Email"
    id="email"
    name="email"
    type="email"
    bind:value={email} />
  <Input
    label="Password"
    id="password"
    name="password"
    type="password"
    bind:value={password} />
  <Input
    label="Confirm Password"
    id="confirm-password"
    name="confirm-password"
    type="password"
    bind:value={confirmPassword} />
  {#if confirmPassword !== "" && confirmPassword !== password}
    <p class="text-red-600 text-sm font-semibold">Password not match</p>
  {/if}
  <Button type="submit" disabled={validatePassword(password, confirmPassword)} >اصنع حساب</Button>
  <slot/>
</form>
