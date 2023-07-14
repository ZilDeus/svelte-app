<script>
  import axios from "axios";
  import Button from "$lib/Button.svelte";
  import ItemViewer from "$lib/ItemViewer.svelte";
  import Input from "../../lib/Input.svelte";
  let viewItems = false;
  export let data;
  let user = data.user;
  let MealSelected = false;
  let addedMealName = "";
  let addedMealDesc = "";
  let selectedMeal = { Name: "", Description: "", Dishes: [] };

  const GetTotalCals = (meal) => {
    if (!meal.Dishes || meal.Dishes.length <= 0) return 0;
    let sum = 0;
    meal.Dishes.forEach((element) => {
      sum = sum + element.Cratio * element.Amount;
    });
    return sum.toFixed(1);
  };

  const UpdateUserData = async () => {
    MealSelected = false;
    viewItems = false;
    const res = await axios({
      method: "POST",
      url: "https://gobackend2-zildeus.b4a.run/get-user",
      headers: { key: String("1202"), id: String(sessionid) },
    }).catch(() => {
      throw redirect(301, "/sign-in");
    });
    if (res) {
      user = res.data;
    }
  };
  const GetTotalProtien = (meal) => {
    if (!meal.Dishes || meal.Dishes.length <= 0) return 0;
    let sum = 0;
    meal.Dishes.forEach((element) => {
      sum = sum + element.Pratio * element.Amount;
    });
    return sum.toFixed(1);
  };
  async function RemoveMeal(meal) {
    MealSelected = false;
    viewItems = false;
    console.log(meal);
    await axios({
      method: "POST",
      url: "https://gobackend2-zildeus.b4a.run/rem-meal",
      headers: { key: String("1202"), id: data.id, name: meal },
    });
    await UpdateUserData();
  }
  async function AddMeal(name, desc) {
    MealSelected = false;
    viewItems = false;
    await axios({
      method: "POST",
      url: "https://gobackend2-zildeus.b4a.run/add-meal",
      headers: { key: String("1202"), id: data.id },
      data: { name: name, description: desc },
    });
    await UpdateUserData();
  }
  async function UpdateMealItems() {
    MealSelected = false;
    viewItems = false;
    await axios({
      method: "POST",
      url: "https://gobackend2-zildeus.b4a.run/update-meal",
      headers: { key: String("1202"), id: data.id },
      data: {
        name: selectedMeal.Name,
        Description: selectedMeal.Description,
        Dishes: selectedMeal.Dishes,
      },
    });
    await UpdateUserData();
  }
</script>

<dialog
  close
  id="add-items-dialog"
  class="absolute mx-auto border-2 bg-slate-900 bg-opacity-90 top-40"
>
  <ItemViewer
    extraButton={{
      name: "add to meal",
      callback: (item) => {
        if (!selectedMeal.Dishes) selectedMeal.Dishes = Array();
        selectedMeal.Dishes.push({
          Name: item.Name,
          Cratio: item.Cratio,
          Pratio: item.Pratio,
          Amount: Number(item.Amount),
          Unit: item.Unit,
        });
        UpdateMealItems();
        MealSelected = false;
        viewItems = false;
        document.getElementById("add-items-dialog").close();
      },
    }}
  />
</dialog>
<dialog
  close
  id="add-meals-dialog"
  class="absolute mx-auto border-2 bg-slate-900 bg-opacity-90 top-40"
>
  <div class="grid grid-flow-row space-y-6 justify-items-center">
    <Input
      bind:value={addedMealName}
      name="meal-name"
      id="add-meal-name"
      label="اسم الوجبة"
      type="text"
    />
    <Input
      bind:value={addedMealDesc}
      name="meal-desc"
      id="add-meal-desc"
      label="وصف الوجبة"
      type="text"
    />
    <Button
      disabled={addedMealName.length == 0 || addedMealDesc.length == 0}
      onClick={() => {
        AddMeal(
          document.getElementById("add-meal-name").value,
          document.getElementById("add-meal-desc").value
        );
        document.getElementById("add-meals-dialog").close();
      }}
      >اصنع
    </Button>
  </div>
</dialog>
<dialog
  close
  id="remove-meals-dialog"
  class="absolute mx-auto border-2 bg-slate-900 bg-opacity-90 top-40"
>
  <div class="grid grid-flow-row text-white text-xl gap-1">
    {#if user.Meals && user.Meals.length > 0}
      {#each user.Meals as meal,i}
        <button
          on:click={() => {
            user.Meals.splice(i, 1);
            RemoveMeal(meal.Name);
            MealSelected = false;
            viewItems = false;
            document.getElementById("remove-meals-dialog").close();
          }}>{meal.Name}</button
        >
      {/each}
    {/if}
  </div>
</dialog>
<dialog
  close
  id="remove-items-dialog"
  class="absolute mx-auto border-2 bg-slate-900 bg-opacity-90 top-40"
>
  <div class="grid grid-flow-row text-white text-xl gap-1">
    {#if selectedMeal.Dishes && selectedMeal.Dishes.length > 0}
      {#each selectedMeal.Dishes as dish, i}
        <button
          on:click={() => {
            selectedMeal.Dishes.splice(i, 1);
            UpdateMealItems();
            MealSelected = false;
            viewItems = false;
            document.getElementById("remove-items-dialog").close();
          }}>{dish.Name}</button
        >
      {/each}
    {/if}
  </div>
</dialog>
<section class="m-auto w-10/12 max-w-screen-sm grid grid-flow-row mt-20">
  <button
    class="inline-block text-indigo-600 bg-black hover:bg-indigo-700 active:bg-indigo-800 hover:text-white h-20"
    on:click={() => (viewItems = !viewItems)}>اعرض الوجبات</button
  >
  <ul class={`grid grid-flow-row  bg-white ${!viewItems ? "hidden" : ""}`}>
    {#if user.Meals && user.Meals.length > 0}
      {#each user.Meals as meal}
        <button
          class="text-indigo-600 bg-black hover:bg-indigo-700 active:bg-indigo-800 hover:text-white border-none px-3 py-4"
          on:click={() => {
            MealSelected = true;
            viewItems = false;
            selectedMeal = meal;
          }}
        >
          {meal.Name}</button
        >
      {/each}
    {/if}
  </ul>
  {#if MealSelected}
    <div
      class="bg-indigo-600 text-white rounded-md text-center p-4 my-4 space-y-4"
    >
      <h2 class="font-bold text-xl">{selectedMeal.Name}</h2>
      <h2 class="font-bold text-lg">{selectedMeal.Description}</h2>
      <dev
        class="border-2 border-solid border-black grid grid-flow-row grid-cols-2"
      >
        <h2
          class="p-3 float-left border-collapse border-black border-r-2 border-b-2"
        >
          طعام
        </h2>
        <h2 class="p-3 float-righ border-collapse border-black border-b-2">
          كمية
        </h2>
        {#if selectedMeal.Dishes && selectedMeal.Dishes.length > 0}
          {#each selectedMeal.Dishes as dish}
            <h2
              class="p-3 float-left border-collapse border-black border-r-2 border-b-2"
            >
              {dish.Name}
            </h2>
            <h2 class="p-3 float-righ border-collapse border-black border-b-2">
              {dish.Amount.toFixed(1)}({dish.Unit})
            </h2>
          {/each}
        {/if}
      </dev>
      <h2 class="font-bold text-lg">
        مجموع السعرات:{GetTotalCals(selectedMeal)}
      </h2>
      <h2 class="font-bold text-lg">
        مجموع البروتين:{GetTotalProtien(selectedMeal)}
      </h2>
      <button
        class="mt-4 underline mx-2"
        on:click={() => document.getElementById("add-items-dialog").show()}
        >اضف اكلة</button
      >
      <button
        class="mt-4 underline mx-2"
        on:click={() => {
          if (selectedMeal.Dishes && selectedMeal.Dishes.length > 0)
            document.getElementById("remove-items-dialog").show();
        }}>ازل اكلة</button
      >
    </div>
  {/if}
</section>
<div class="flex justify-center gap-3 m-auto my-4">
  <Button
    onClick={() => {
      document.getElementById("add-meals-dialog").show();
    }}>اضف وجبة</Button
  >
  <Button
    onClick={() => {
      if (user.Meals)
        document.getElementById("remove-meals-dialog").show();
    }}>ازل وجبة</Button
  >
</div>
