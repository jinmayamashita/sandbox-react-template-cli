import { useToggle } from "@/hooks/useToggle";
import { Button } from "@/components/atom/button";
import { Link } from "wouter";

const Home = () => {
  const [isTextChanged, setIsTextChanged] = useToggle();

  return (
    <div>
      <h1>Welcome Home</h1>
      <div style={{ marginBottom: 10 }}>
        <Link to="/user">Click the link to jump to the user page</Link>
      </div>
      <Button onClick={setIsTextChanged}>
        {isTextChanged ? "Toggled" : "Click to Toggle"}
      </Button>
    </div>
  );
};

export default Home;
