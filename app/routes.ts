import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  index("./root.tsx"),
  route("params", "../src/components/Parameters/index.tsx"),

] satisfies RouteConfig;