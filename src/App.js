import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './componets/MovieRow'
import FeaturedMovie from './componets/FeaturedMovie'
import Header from './componets/Header'

import Load from './assests/Netflix_LoadTime.gif'

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      // pegar filme em destaque featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);

    }

    loadAll()
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.screenY > 10){
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    } 

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);

    }
  })

  return (
    <div className="page">

      <Header black={blackHeader}/>

      { featuredData &&
        <FeaturedMovie  item={featuredData}/>

      }

      <section className="lists">
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        feito na força do odio pelo Guilherme <br />
        Direitos de imagem para netflix<br />
        Direito de dados da Tmdb
      </footer>

      {movieList.length <= 0 && 
        <div className="loading">
            <img src={Load}></img>
        </div>
      }
    </div>
  );
}
