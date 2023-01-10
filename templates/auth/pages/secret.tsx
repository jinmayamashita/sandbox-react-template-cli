import { PrivateComponent } from "../modules/auth/hooks/useAuth";

function Secret() {
  return <>secret page</>;
}
export default () => (
  <PrivateComponent>
    <Secret />
  </PrivateComponent>
);
