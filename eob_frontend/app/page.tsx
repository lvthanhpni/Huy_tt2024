"use client";
import Banner from "@/components/HomePage/Banner";
import NewsSection from "@/components/HomePage/NewsSection";
import SearchSection from "@/components/HomePage/SearchSection";
import SliderSection from "@/components/HomePage/SliderSection";
import Statistic from "@/components/HomePage/Statistic";
import TopicSection from "@/components/HomePage/TopicSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <SliderSection />
      <TopicSection />
      <Statistic />
      <SearchSection />
      <NewsSection />
    </div>
  );
}
