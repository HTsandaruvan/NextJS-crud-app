
'use client'
import React, { useState, useEffect, useRef } from 'react';
import './Slider.css';
import Link from 'next/link';

const Carousel = () => {


    const [items, setItems] = useState([
        { id: 1, name: 'Openheimer', img: 'https://i.pinimg.com/1200x/5b/d5/36/5bd5364ccbb3b7e09fec715e345bceb4.jpg' },
        { id: 2, name: 'Avengers 4', img: 'https://i.pinimg.com/1200x/ce/a9/ab/cea9ab625d1486fbfc534b6984b12fbd.jpg' },
        { id: 3, name: 'Spider-Man 3', img: 'https://i.pinimg.com/1200x/23/1a/d1/231ad15fc52fa810ecd867538372310b.jpg' },
        { id: 4, name: 'Joker', img: 'https://i.pinimg.com/1200x/b3/ea/49/b3ea494c0225354bfa5f6eaaaf9372e0.jpg' },
        { id: 5, name: 'Iron Man Prime', img: 'https://i.pinimg.com/1200x/3d/ef/cd/3defcda721d7e87c3879c891811ac878.jpg' },
        { id: 6, name: '', img: 'https://i.pinimg.com/1200x/ff/76/cd/ff76cd8b59dd086469adb73ad625206d.jpg' },
        { id: 7, name: 'KINGFISHER', img: 'https://i.pinimg.com/1200x/61/29/b5/6129b57f22c8468e2da0118fbedacdae.jpg' },
        { id: 8, name: 'RRR', img: 'https://i.pinimg.com/1200x/7e/e5/44/7ee5448b7f3c159102d56513a1d3c29e.jpg' },
        { id: 9, name: 'Kung Fu Panda 3', img: 'https://i.pinimg.com/1200x/d6/dc/e9/d6dce992c9760f6e538d3b263ee00ac5.jpg' },
        { id: 10, name: 'Cars 4', img: 'https://i.pinimg.com/1200x/89/73/cb/8973cb80e93e6a955f725b97a4c9cff0.jpg' },
    ]);
    const [animationType, setAnimationType] = useState('');
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    const runningTimeRef = useRef(null);

    const resetAnimation = () => {
        if (runningTimeRef.current) {
            runningTimeRef.current.style.animation = 'none';
            // Force reflow
            runningTimeRef.current.offsetHeight;
            runningTimeRef.current.style.animation = `runningTime ${timeAutoNext / 1000}s linear forwards`;
        }
    };

    useEffect(() => {
        const autoNext = setTimeout(() => {
            handleNext();
        }, timeAutoNext);

        resetAnimation();

        return () => clearTimeout(autoNext);
    });

    const handleNext = () => {
        setItems((prevItems) => {
            const [first, ...rest] = prevItems;
            return [...rest, first];
        });
        setAnimationType('next');
    };

    const handlePrev = () => {
        setItems((prevItems) => {
            const last = prevItems[prevItems.length - 1];
            return [last, ...prevItems.slice(0, -1)];
        });
        setAnimationType('prev');
    };

    return (
        <div className="carousel min-h-screen">
            <div className={`list ${animationType}`}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`item ${index === 1 ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${item.img})`,
                        }}
                    >
                        {index === 1 && (
                            <div className="content">
                                {/**  <div className="title">Mflix</div>*/}
                                <div className="name">{item.name}</div>
                                <div className="des">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis culpa similique consequuntur, reprehenderit
                                    dicta repudiandae.
                                </div>
                                <div className="btn">
                                    <button><Link href={"/login"}>See More</Link></button>
                                    <button><Link href={"/login"}> Watch Now</Link></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="arrows">
                <button className="prev" onClick={handlePrev}>
                    {'<'}
                </button>
                <button className="next" onClick={handleNext}>
                    {'>'}
                </button>
            </div>
            <div className="timeRunning" ref={runningTimeRef}></div>
        </div>
    );
};

export default Carousel;
