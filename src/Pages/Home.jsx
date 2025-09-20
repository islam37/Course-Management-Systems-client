import React from 'react';
import Banner from '../Components/SocialLogin/Banner';
import LatestCourses from './LatestCourses';
import PopularCourses from './PopularCourses';
import ExtraSections from './ExtraSections';

const Home = () => {
    return (
        <div>
            <section className='relative w-full h-[90vh] max-h-[800px] flex items-center justify-center overflow-hidden'>
                <Banner > </Banner>
            </section>
            <section>
                <LatestCourses></LatestCourses>
                <br />
                <PopularCourses></PopularCourses>
                <br />
                <ExtraSections></ExtraSections>
            </section>
        </div>
    );
};

export default Home;