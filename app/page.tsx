import HomePage from "./components/Home";
import Story from "./components/Story";

export default function Home() {
  return (
    <main className="mt-16">
      <Story />
      <HomePage />
      <div className="mb-96"></div>
    </main>
  );
}
