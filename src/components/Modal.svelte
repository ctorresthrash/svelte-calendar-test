<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");

  let modal;

  const handle_keydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key === "Tab") {
      // trap focus
      const nodes = modal.querySelectorAll("*");
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      e.preventDefault();
    }
  };

  const previously_focused =
    typeof document !== "undefined" && document.activeElement;

  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }
</script>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: white;
  }
</style>

<svelte:window on:keydown={handle_keydown} />

<div
  class="modal-background"
  on:click={close}
  transition:fade={{ duration: 100 }} />

<div
  class="modal rounded shadow-lg z-50"
  role="dialog"
  aria-modal="true"
  bind:this={modal}
  transition:fade={{ duration: 100 }}>
  <div class="flex justify-between items-center pb-3">
    <slot name="header" />
    <div class="modal-close cursor-pointer z-50" on:click={close}>
      <svg
        class="fill-current text-black"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18">
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47
          1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
      </svg>
    </div>
  </div>
  <hr />
  <slot />
</div>
