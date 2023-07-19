<script>
  import SignInForm from "$lib/SignInForm.svelte";
  import { page } from "$app/stores";
  console.log($page.url.searchParams);
</script>
{#if $page.url.searchParams.get("success")==="true"}
<dev class="mx-0 bg-indigo-700 grid grid-rows-1 text-center text-white transition ease-in delay-100"> تم تسجيل الدخول بنجاح </dev>
{:else if $page.url.searchParams.get("success")==="false"}
<dev class="mx-0 bg-red-700 grid grid-rows-1 text-center text-white transition ease-in delay-100" dir="rtl">الرمز او الحساب خطا !</dev>
{/if}
<h1 class="text-2xl font-semibold text-center">تسجيل دخول</h1>
<SignInForm class="max-w-xl m-auto px-2">
  <p class="text-white" dir="rtl">
    ما عدك حساب ؟ <a class="text-blue-300 font-bold" href="sign-up" >اصنع حساب</a>
  </p>
</SignInForm>
