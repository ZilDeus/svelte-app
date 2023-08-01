<script>
  import SignUpForm from "../../lib/SignUpForm.svelte";
  import { page } from "$app/stores";
</script>

{#if $page.url.searchParams.get("success")==="false"}
<dev class="mx-0 bg-red-700 grid grid-rows-1 text-center text-white transition ease-in delay-100" dir="rtl">فشل صنع حساب</dev>
{/if}
<h1 class="text-2xl font-semibold text-center">صناعة حساب</h1>
<SignUpForm class="max-w-xl m-auto px-2">
  <p class="text-white">
    <a class="text-blue-300 font-bold" href="/">سجل دخول</a>?
  </p>
</SignUpForm>
