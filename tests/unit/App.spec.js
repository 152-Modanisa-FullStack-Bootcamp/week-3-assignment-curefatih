import { createLocalVue, mount } from "@vue/test-utils";
import App from "@/App.vue";
import Vuex from "vuex";
import { state, getters, mutations } from "@/store";

describe("App.vue", () => {
  it("should h1 exist", () => {
    const wrapper = mountComponent();
    expect(wrapper.contains("h1")).toBeTruthy();
  });

  it("should h1 text that equals  Daily Coronavirus Cases in Turkey", () => {
    const wrapper = mountComponent();
    expect(wrapper.find("h1").text()).toEqual("Daily Corona Cases in Turkey");
  });

  it("should notificationArea class change", async () => {
    const wrapper = mountComponent();

    // store getter "getCount" returns 0
    expect(wrapper.vm.$store.getters.getCount).toEqual(0);
    // expect notificationArea class to be "safe"
    expect(wrapper.find(".notificationArea").classes()).toContain("safe");

    // change store "count" to 5
    wrapper.vm.$store.commit("addToCount", 5);
    expect(wrapper.vm.$store.getters.getCount).toEqual(5);
    await wrapper.vm.$nextTick(); // wait for next render
    expect(wrapper.find(".notificationArea").classes()).toContain("normal");
    // boundary  check 5 + 4 = 9 now
    wrapper.vm.$store.commit("addToCount", 4);
    expect(wrapper.vm.$store.getters.getCount).toEqual(9);
    await wrapper.vm.$nextTick(); // wait for next render
    expect(wrapper.find(".notificationArea").classes()).toContain("normal");

    // change store "count" to 10  by adding 1
    wrapper.vm.$store.commit("addToCount", 1);
    // expect notificationArea class to be "danger"
    await wrapper.vm.$nextTick(); // wait for next render
    expect(wrapper.find(".notificationArea").classes()).toContain("danger");
  });

  it("should notificationArea text change", async () => {
    const wrapper = mountComponent();
    // store getter "getCount" returns 0
    expect(wrapper.vm.$store.getters.getCount).toEqual(0);
    // expect notificationArea text to be "So safe. Case count is ${count}k"
    expect(wrapper.find(".notificationArea").text()).toEqual(
      "So safe. Case count is 0k"
    );

    // change store "count" to 5
    wrapper.vm.$store.commit("addToCount", 5);
    expect(wrapper.vm.$store.getters.getCount).toEqual(5);
    // expect notificationArea text to be "Life is normal. Case count is ${count}k"
    await wrapper.vm.$nextTick(); // wait for next render
    expect(wrapper.find(".notificationArea").text()).toEqual(
      "Life is normal. Case count is 5k"
    );

    // change store "count" to 10  by adding 5
    wrapper.vm.$store.commit("addToCount", 5);
    expect(wrapper.vm.$store.getters.getCount).toEqual(10);
    await wrapper.vm.$nextTick(); // wait for next render
    // expect notificationArea text to be `Danger!!! Case count is ${count}k`
    expect(wrapper.find(".notificationArea").text()).toEqual(
      "Danger!!! Case count is 10k"
    );
  });
});

function mountComponent(overrides = {}) {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      ...state,
    },
    getters: {
      ...getters,
    },
    mutations: {
      ...mutations,
    },
    ...overrides,
  });

  return mount(App, {
    localVue,
    store,
  });
}
