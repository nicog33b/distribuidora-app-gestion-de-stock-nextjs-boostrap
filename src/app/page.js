'use client';
import React from 'react';
import './globals.css'
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import Metrics from '../components/metrics';



export default function AdminDates({}) {
  return (
    <div className="w-full">
    <Navbar />
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4 bg-white w-full lg:w-3/4 xl:w-4/5 mx-auto overflow-x-auto">
      <Metrics></Metrics>
      </div>
    </div>
  </div>
  


  );
}


