<script>
  import Button from "$lib/Button.svelte";
  import ItemViewer from "$lib/ItemViewer.svelte";
  import Input from "$lib/Input.svelte";

  let viewItems = false;
  export let data;
  let user = data.user;
  let items = data.items;
  let MealSelected = false;
  let addedMealName = "";
  let addedMealDesc = "";
  let selectedMeal = { Index:0 ,Name: "", Description: "", Dishes: [] };

  const GetTotalCals = (meal) => {
    if (!meal.Dishes || meal.Dishes.length <= 0) return 0;
    let sum = 0;
    meal.Dishes.forEach((element) => {
      sum = sum + items.filter(item => item.Id == element.Item)[0].Cratio * element.Amount;
    });
    return sum.toFixed(1);
  };
  const GetTotalProtien = (meal) => {
    if (!meal.Dishes || meal.Dishes.length <= 0) return 0;
    let sum = 0;
    meal.Dishes.forEach((element) => {
      sum = sum + items.filter(item => item.Id == element.Item)[0].Pratio * element.Amount;
    });
    return sum.toFixed(1);
  };
</script>

<dialog
  close
  id="add-items-dialog"
  class="absolute mx-auto border-2 bg-slate-900 bg-opacity-90 top-40"
>
<form method="post" action={`?/addItem&mealIndex=${selectedMeal.Index}`}>
  <ItemViewer menuItems={data.items}>
  <Button type="submit">add to meal</Button>
  </ItemViewer>
</form>
</dialog>
<dialog
  close
  id="add-meals-dialog"
  class="absolute mx-auto border-2 bg-slate-900 bg-opacity-90 top-40"
>
  <form method="post" action="?/addMeal">
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
    <Button type="submit">add meal</Button>
  </div>
  </form>
</dialog>
<dialog
  close
  id="remove-meals-dialog"
  class="absolute mx-auto border-2 bg-slate-900 bg-opacity-90 top-40"
>
  <form method="post" class="grid-flow-row text-white text-xl gap-1 text-center space-y-3">
    {#if user.Meals && user.Meals.length > 0}
      {#each user.Meals as meal}
        <button type="submit" formaction="?/removeMeal&mealName={meal.Name}">{meal.Name}</button>
        <br/>
      {/each}
    {/if}
  </form>
</dialog>
<dialog
  close
  id="remove-items-dialog"
  class="absolute mx-auto border-2 bg-slate-900 bg-opacity-90 top-40"
>
  <form method="post" class="grid grid-flow-row text-white text-xl gap-1">
    {#if selectedMeal.Dishes && selectedMeal.Dishes.length > 0}
      {#each selectedMeal.Dishes as dish, i}
        <button type="submit" formaction={`?/removeItem&mealIndex=${selectedMeal.Index}&itemIndex=${i}`}>
        {items.filter(item => item.Id == dish.Item)[0].Name}
        </button>
      {/each}
    {/if}
  </form>
</dialog>
<section class="m-auto w-10/12 max-w-screen-sm grid grid-flow-row mt-20">
  <button
    class="inline-block text-indigo-600 bg-black hover:bg-indigo-700 active:bg-indigo-800 hover:text-white h-20"
    on:click={() => (viewItems = !viewItems)}>اعرض الوجبات</button
  >
  <ul class={`grid grid-flow-row  bg-white ${!viewItems ? "hidden" : ""}`}>
    {#if user.Meals && user.Meals.length > 0}
      {#each user.Meals as meal,i}
        <button
          class="text-indigo-600 bg-black hover:bg-indigo-700 active:bg-indigo-800 hover:text-white border-none px-3 py-4"
          on:click={() => {
            MealSelected = true;
            viewItems = false;
            selectedMeal = meal;
            selectedMeal.Index = i;
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
              {items.filter(item => item.Id == dish.Item)[0].Name}
            </h2>
            <h2 class="p-3 float-righ border-collapse border-black border-b-2">
              {dish.Amount}({items.filter(item => item.Id == dish.Item)[0].Unit})
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
