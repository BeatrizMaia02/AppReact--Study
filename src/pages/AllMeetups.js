import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

function AllMetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://react-app-de0c8-default-rtdb.europe-west1.firebasedatabase.app/meetups.json"
    )
      .then((response) => {
        return response.json(); // acessa a data convertida de jason para plane js e retorna a promessa
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key], // pega todos os valores do objeto e coloca no novo objeto
          };

          meetups.push(meetup); // adiciona o objeto ao array
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []); // [] para que o useEffect seja executado apenas uma vez

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1> All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMetupsPage;
