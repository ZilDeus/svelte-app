<script>
  import Input from "./Input.svelte";
  export let menuItems;
  export let callback;

  export let extraButton = null;
  var filteredItems = Array();
  let inputValue = "";

  const handleInput = () => {
      return (filteredItems = menuItems.filter((Item) =>
        Item.Name.toLowerCase().match(inputValue.toLowerCase())
      ));
  };
</script>
<section class="max-w-xl mx-auto w-11/12">
  <Input
    label="ابحث"
    id="item-input"
    type="text"
    onInput={()=> { handleInput()}}
    bind:value={inputValue}
  />
  <div class={"empty:hidden grid grid-flow-row border-white border-solid border-2"} >
    {#if inputValue.length > 0}
      {#if filteredItems.length > 0}
        {#each filteredItems as item}
          <button
            class="text-indigo-600 bg-black hover:bg-indigo-700 active:bg-indigo-800 hover:text-white border-none px-3 py-4"
            on:click={() => {
              callback(item);
              inputValue = "";
            }}>{item.Name}</button
          >
        {/each}
      {:else if extraButton !== null}
        <button
          class="text-indigo-600 bg-black hover:bg-indigo-700 active:bg-indigo-800 hover:text-white border-none px-3 py-4"
          on:click={() => extraButton.callback()}
        >
          {extraButton.name}
        </button>
      {/if}
    {/if}
  </div>
</section>
