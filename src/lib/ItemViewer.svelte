<script>
  import Dropdown from "../lib/Dropdown.svelte";
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";
  import axios from "axios";
  import { onMount } from "svelte";

  export let extraButton = null;

  var calories = 100;
  var protien = 100;
  var amount = 50;

  var Cratio = 2;
  var Pratio = 2;

  var isSelected = false;
  var selectedItem;
  var itemName = "";
  var menuItems;

  const selectItemCallback = (item) => {
    isSelected = true;
    selectedItem = item;
    itemName = item.Name;
    Cratio = item.Cratio;
    Pratio = item.Pratio;
    amount = (100/Cratio).toFixed(1);
    calories = (amount * Cratio).toFixed(1);
    protien = (amount * Pratio).toFixed(1);
  };

  onMount(async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "https://gobackend2-zildeus.b4a.run/get-items",
        headers: { key: String("1202") },
      });
      menuItems = res.data;
    } catch {}
  });
</script>

<Dropdown {menuItems} callback={selectItemCallback} />
{#if isSelected}
  <dev class="block text-center my-5 space-y-5 mx-auto w-80">
    <h2 class="text-indigo-600">{itemName}</h2>
    <Input
      class="text-black"
      label="calories"
      id="calories"
      name="calories"
      type="number"
      bind:value={calories}
      onInput={(e) => {
        if(e.target.value.length === 0) e.target.value = "1"
        calories = parseFloat(e.target.value);
        amount = (calories / Cratio).toFixed(1);
        protien = (amount * Pratio).toFixed(1);
      }}
    />

    <Input
      class="text-black"
      label="protien"
      id="protien"
      name="protien"
      type="number"
      bind:value={protien}
      onInput={(e) => {
        if(e.target.value.length === 0) e.target.value = "1"
        protien = parseFloat(e.target.value);
        amount = (protien / Pratio).toFixed(1);
        calories = (amount * Cratio).toFixed(1);
      }}
    />

    <Input
      class="text-black"
      label="amount in ({selectedItem.Unit})"
      id="amount"
      name="amount"
      type="number"
      bind:value={amount}
      onInput={(e) => {
        if(e.target.value.length === 0) e.target.value = "1"
        amount = parseFloat(e.target.value);
        calories = (amount * Cratio).toFixed(1);
        protien = (amount * Pratio).toFixed(1);
      }}
    />

    {#if extraButton !== null}
      <Button onClick={() => {selectedItem.Amount = amount;extraButton.callback(selectedItem)}}>
        {extraButton.name}
      </Button>
    {/if}
  </dev>
{/if}
