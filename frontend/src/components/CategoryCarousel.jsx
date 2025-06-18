

import React, { useEffect, useState, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Mobile Developers",
    "Game Developers"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    // Autoplay logic
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % category.length);
        }, 3000); // change every 3 seconds

        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
                    {category.map((cat, index) => (
                        <CarouselItem key={cat} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                            <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious onClick={() => setCurrentIndex((prev) => (prev - 1 + category.length) % category.length)} />
                <CarouselNext onClick={() => setCurrentIndex((prev) => (prev + 1) % category.length)} />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
