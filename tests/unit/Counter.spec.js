import { createLocalVue, mount } from "@vue/test-utils";
import Counter from "@/Counter.vue";
import Vuex from "vuex";
import { state, getters } from "@/store";

describe("Counter.vue", () => {
  it("should component exist", () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should increment button exist", () => {
    const wrapper = mountComponent();
    //  expect decrement button to exist inside  many button  that has text "Decrease"
    const increaseButton = wrapper.findAll("button").filter((button) => {
      return button.text() === "Increase";
    });

    expect(increaseButton.length).toBe(1);
  });

  it("should decrement button exist", () => {
    const wrapper = mountComponent();
    //  expect decrement button to exist inside  many button  that has text "Decrease"
    const decrementButton = wrapper.findAll("button").filter((button) => {
      return button.text() === "Decrease";
    });

    expect(decrementButton.length).toBe(1);
  });

  it("should component have a increase button", () => {
    let dispatch = jest.fn();

    const localThis = {
      $store: {
        dispatch,
      },
    };

    Counter.methods.increase.call(localThis);
    expect(dispatch).toHaveBeenCalledWith("increment");
  });

  it("should component have a decrease button", () => {
    let dispatch = jest.fn();

    const localThis = {
      $store: {
        dispatch,
      },
    };

    Counter.methods.decrease.call(localThis);
    expect(dispatch).toHaveBeenCalledWith("decrement");
  });

  it("should component have a count", () => {
    const wrapper = mountComponent();
    expect(wrapper.contains("span")).toBeTruthy();
  });

  it("should increase and decrease count", () => {
    let dispatch = jest.fn();

    const localThis = {
      $store: {
        dispatch,
      },
    };

    Counter.methods.increase.call(localThis);
    Counter.methods.increase.call(localThis);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith("increment");

    Counter.methods.decrease.call(localThis);
    expect(dispatch).toHaveBeenCalledWith("decrement");
  });
});

function mountComponent() {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      ...state,
    },
    getters: {
      ...getters,
    },
  });

  return mount(Counter, {
    localVue,
    store,
  });
}
