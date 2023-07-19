<div class="parent">
  <div class="child" />
</div>

<style>
  :root{
    --p-size: 200px;
    --c-size: 100px;
    --p-center: calc((var(--p-size)/2) - (var(--c-size)/2));
  }
  .parent {
    width: var(--p-size);
    aspect-ratio: 1/1;
    background: red;
    border-radius: 50%;
    position: relative;
    margin-inline: auto;
    margin-block: 3rem;
  }
  .child {
    --angle: 0deg;
    --size: 100px;
    --divideby: 2;
    width: var(--c-size);
    aspect-ratio: 1/1;
    background: green;
    border-radius: 50%;
    position: absolute;
    top:    var(--p-center);
    right:  var(--p-center);
    transform: translate(
    calc(cos(var(--angle)) * var(--p-center)),
    calc(sin(var(--angle)) * var(--p-center))
    );
  }

</style>
