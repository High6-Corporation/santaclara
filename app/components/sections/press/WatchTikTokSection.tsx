"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface TikTokVideo {
  id: string;
  videoUrl: string;
  videoId: string;
  title: string;
  thumbnail?: string;
}

const tiktokVideos: TikTokVideo[] = [
  { 
    id: '1', 
    videoUrl: 'https://www.tiktok.com/@santaclaraplywood/video/7534614515468569874',
    videoId: '7534614515468569874',
    title: 'Plywood Thickness Guide' 
  },
  { 
    id: '2', 
    videoUrl: 'https://www.tiktok.com/@santaclaraplywood/video/7511267871910137106',
    videoId: '7511267871910137106',
    title: 'Quality Over Cheap Plywood' 
  },
  { 
    id: '3', 
    videoUrl: 'https://www.tiktok.com/@santaclaraplywood/video/7376495322270289157',
    videoId: '7376495322270289157',
    title: 'Community Support - Yellow Boat Project' 
  },
  { 
    id: '4', 
    videoUrl: 'https://www.tiktok.com/@santaclaraplywood/video/7616357845444988178',
    videoId: '7616357845444988178',
    title: 'WORLDBEX 2026 Day 1' 
  },
  { 
    id: '5', 
    videoUrl: 'https://www.tiktok.com/@santaclaraplywood/video/7612589672862141712',
    videoId: '7612589672862141712',
    title: 'WORLDBEX 2026 Announcement' 
  },
  { 
    id: '6', 
    videoUrl: 'https://www.tiktok.com/@santaclaraplywood/video/7608497529927240976',
    videoId: '7608497529927240976',
    title: 'Built by Pros - Marine Plywood' 
  },
  { 
    id: '7', 
    videoUrl: 'https://www.tiktok.com/@santaclaraplywood/video/7605552080450800903',
    videoId: '7605552080450800903',
    title: 'Strength and Reliability' 
  },
  { 
    id: '8', 
    videoUrl: 'https://www.tiktok.com/@santaclaraplywood/video/7602207486900325649',
    videoId: '7602207486900325649',
    title: 'Good Projects Start with Good Materials' 
  },
];

export function WatchTikTokSection() {
  const [videos, setVideos] = useState<TikTokVideo[]>(tiktokVideos);

  // Fetch TikTok thumbnails using oEmbed API
  useEffect(() => {
    const fetchThumbnails = async () => {
      const updatedVideos = await Promise.all(
        tiktokVideos.map(async (video) => {
          try {
            const response = await fetch(
              `https://www.tiktok.com/oembed?url=${video.videoUrl}`
            );
            const data = await response.json();
            return {
              ...video,
              thumbnail: data.thumbnail_url || `/images/gallery-image-${video.id}.jpg`,
            };
          } catch (error) {
            console.error(`Error fetching thumbnail for video ${video.id}:`, error);
            return {
              ...video,
              thumbnail: `/images/gallery-image-${video.id}.jpg`, // fallback
            };
          }
        })
      );
      setVideos(updatedVideos);
    };

    fetchThumbnails();
  }, []);

  return (
    <Section bgColor="bg-[#F5F6FA] lg:py-[50px] py-[36px]">
      <Row className="!max-w-[1416px]">
        <div className="text-center max-w-[674px] mx-auto">
          <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal leading-[40px] md:leading-[72.6px] tracking-[-2.4px] text-[#333333] ">
            Watch Us on TikTok
          </h2>
          <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333] lg:my-[30px] my-[20px]">
            Catch quick explainers, updates, and relatable content all in under a minute.
          </p>
        </div>
        
        <div className="w-full">
          <Swiper
            slidesPerView={1}
            spaceBetween={27.98}
            loop={false}
            pagination={{
              clickable: true,
              el: '.custom-swiper-pagination',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <a 
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer group"
                >
                  <div className="overflow-hidden bg-black relative">
                    <img 
                      src={video.thumbnail || '/images/gallery-image.jpg'}
                      alt={video.title}
                      className="w-full h-[428px] object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                      <div className="w-[60px] h-[60px] group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src="/images/play-icon.svg" 
                          alt="Play video"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Pagination Container */}
          <div className="custom-swiper-pagination"></div>
        </div>
      </Row>
    </Section>
  );
}
