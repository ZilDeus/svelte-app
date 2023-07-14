<script>
  import ItemViewer from "$lib/ItemViewer.svelte";

</script>

<dialog close id="meals-dialog" class="absolute  mx-auto border-2 bg-slate-900 bg-opacity-90 top-1/3">
  <div class="grid space-y-5 text-black ">
  <button class="bg-white p-3 rounded-md" on:click={()=>document.getElementById("meals-dialog").close()}>رجوع</button>
  </div>
</dialog>
<div class="block mt-32"/>
<ItemViewer/>
