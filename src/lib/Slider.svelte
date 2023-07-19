<script>
  import RangeSlider from "svelte-range-slider-pips";
  export let Name;
  export let Unit;
  export let InitialValue = 50;
  export let Max = parseFloat(100);
  export let onChange;
  const id = `${Name}-slider`;
</script>

<label for={id} class="text-white" dir="rtl" >{Name} - {InitialValue}({Unit})</label>
<RangeSlider
  values={[parseFloat(InitialValue)]}
  range={"min"}
  min={0}
  max={parseFloat(Max)}
  {id}
  pips
  pipstep={parseFloat(Max) / 10}
  on:change={(e) => {
    onChange(parseFloat(e.detail.value).toFixed(1));
  }}
/>
