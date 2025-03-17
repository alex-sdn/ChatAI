import mitt from "mitt";

type Events = {
  sentFirstPrompt: void;
};

const eventEmitter = mitt<Events>();

export default eventEmitter;