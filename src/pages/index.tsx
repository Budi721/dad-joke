import {FilterJoke, ListJokes} from "@/components/molecules";
import {JokeProvider} from "@/contexts";

export default function HomePage() {
  return (
    <JokeProvider>
      <FilterJoke sx={{mb: 4}}/>
      <ListJokes/>
    </JokeProvider>
  )
}