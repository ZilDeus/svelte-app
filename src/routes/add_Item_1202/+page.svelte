<script>
  import Input from "$lib/Input.svelte";
  import Button from "$lib/Button.svelte";
</script>

<form method="POST" class="space-y-5 max-w-xl px-2 mt-32 mx-auto">
  <Input name="name" label="name" type="text" />
  <Input name="Cratio" label="Cratio" type="float" />
  <Input name="Pratio" label="Pratio" type="float" />
  <Input name="unit" label="unit" type="text" />
  <Button type="submit">submit</Button>
</form>
