import React, { useState, useEffect } from "react";
import Axios from "axios";
import Nopicture from "../images/NoPicture.jpg"


function Players() {
    
  const [Playerdata, setPlayerData] = useState([]);
  const [search, setSearch] = useState("");
  let URL =
    "https://damp-beach-56595.herokuapp.com/https://cricket.sportmonks.com/api/v2.0/players?api_token=Jhiv81nBEBk6Y9G2Uk0ikykKqGR96VzCya1yeQEtXbrNeilcymX8dYHbX1t7";


  const fetcher = async () => {
    try {
      const {data} = await Axios.get(URL);
      return data.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setPlayerData(await fetcher());
    };

    fetchData();
  }, []);


  return (
    <div className="container">
      <input
        className="inputbox"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search your favourite player"
        value={search}
      />
      <div className="row">
        {Playerdata.filter((item) => {
          if (search === "") {
            return item;
          } else if (
            item.fullname.toLowerCase().includes(search.toLowerCase()) 
          ) {
            return item;
          }
        }).map((player) => {
          return (
            <div className="col-12 col-lg-4">
              <div key={player.id} class="card">
                <div class="card-header text-center">{player.fullname}</div>
                <div class="card-body">
                  <img
                    class="card-img-top player-img img-fluid"
                    src={player.image_path != "https://cdn.sportmonks.com" ? player.image_path : Nopicture}
                    alt="Player-img"
                  />
                  <div class="card-text">
                    <p>Position: {player.position.name}</p>
                    <p>DOB: {player.dateofbirth}</p>
                    <p>ID: {player.id}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Players;
