import React, {Suspense} from 'react';
import './App.css';
import   './style/css/animate.css';


import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";




const Head = React.lazy(() => import("./components/Content/Head/Header"));
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const NewsPage = React.lazy(() => import("./components/Content/Head/News/NewsPage.jsx"));
const NewsItem = React.lazy(() => import("./components/Content/Head/News/NewsItem.jsx"));
const AnnouncementsPage = React.lazy(() => import("./components/Content/Head/Announcements/AnnouncementsPage.jsx"));
const AnnouncementsItem = React.lazy(() => import("./components/Content/Head/Announcements/AnnouncementsItem.jsx"));
const LessonsAndTrainingPage = React.lazy(() => import("./components/Content/InformationPlatform/LessonsAndTraining/LessonsAndTrainingPage.jsx"));
const LessonsAndTrainingItem = React.lazy(() => import("./components/Content/InformationPlatform/LessonsAndTraining/LessonsAndTrainingItem.jsx"));
const DataAndReportsPage = React.lazy(() => import("./components/Content/InformationPlatform/DataAndReports/DataAndReportsPage.jsx"));
const DataAndReportsItem = React.lazy(() => import("./components/Content/InformationPlatform/DataAndReports/DataAndReportsItem.jsx"));
const UsefulLinks = React.lazy(() => import("./components/Content/InformationPlatform/UsefulLinks/UsefulLinks.jsx"));
const MissionAndHistory = React.lazy(() => import("./components/Content/InformationPlatform/AboutUs/MissionAndHistory.jsx"));
const Partners = React.lazy(() => import("./components/Content/InformationPlatform/AboutUs/Partners.jsx"));
const Structure = React.lazy(() => import("./components/Content/InformationPlatform/AboutUs/Structure.jsx"));
const ContactUs = React.lazy(() => import("./components/ContactUs/ContactUs.jsx"));
const Loader = React.lazy(() => import("./components/Loader/Loader"));



export default function App() {


    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route exact path="/"
                               element={<React.Suspense><Head/></React.Suspense>}/>
                        <Route exact path="/news"
                               element={<React.Suspense fallback={<Loader/>}><NewsPage/></React.Suspense>}/>
                        <Route exact path="/news/:id"
                               element={<React.Suspense fallback={<Loader/>}> <NewsItem/></React.Suspense>}/>
                        <Route exact path="/announcements"
                               element={<React.Suspense fallback={<Loader/>}> <AnnouncementsPage/></React.Suspense>}/>
                        <Route exact path="/announcements/:id"
                               element={<React.Suspense fallback={<Loader/>}> <AnnouncementsItem/></React.Suspense>}/>
                        <Route exact path="/LessonsAndTraining"
                               element={<React.Suspense fallback={<Loader/>}> <LessonsAndTrainingPage/></React.Suspense>}/>
                        <Route exact path="/LessonsAndTraining/:id"
                               element={<React.Suspense fallback={<Loader/>}> <LessonsAndTrainingItem/></React.Suspense>}/>
                        <Route exact path="/DataAndReports"
                               element={<React.Suspense fallback={<Loader/>}> <DataAndReportsPage/></React.Suspense>}/>
                        <Route exact path="/DataAndReports/:id"
                               element={<React.Suspense fallback={<Loader/>}> <DataAndReportsItem/></React.Suspense>}/>
                        <Route exact path="/UsefulLinks"
                               element={<React.Suspense fallback={<Loader/>}> <UsefulLinks/></React.Suspense>}/>
                        <Route exact path="/MissionAndHistory"
                               element={<React.Suspense fallback={<Loader/>}> <MissionAndHistory/></React.Suspense>}/>
                        <Route exact path="/Partners"
                               element={<React.Suspense fallback={<Loader/>}> <Partners/></React.Suspense>}/>
                        <Route exact path="/Structure"
                               element={<React.Suspense fallback={<Loader/>}> <Structure/></React.Suspense>}/>
                        <Route exact path="/ContactUs"
                               element={<React.Suspense fallback={<Loader/>}> <ContactUs/></React.Suspense>}/>
                    </Routes>
                </Suspense>
                <Footer/>
            </div>
        </Router>
    );
}
