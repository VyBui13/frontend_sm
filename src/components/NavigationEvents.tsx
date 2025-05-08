'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@/app/contexts/LoadingContext';
import Loading from './Loading';

const NavigationEvents = () => {
    const { isLoading, showLoading, hideLoading } = useLoading();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    // Set isClient to true on client-side render
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle navigation events
    useEffect(() => {
        // Skip loading for /sign-in or if not client-side
        if (!isClient || pathname === '/sign-in') {
            hideLoading();
            return;
        }

        showLoading();
        const timer = setTimeout(() => {
            hideLoading();
        }, 1000);

        return () => {
            clearTimeout(timer);
            hideLoading();
        };
    }, [pathname, isClient, showLoading, hideLoading]);

    // Render loading UI only when isLoading is true and conditions are met
    if (!isClient || pathname === '/sign-in') {
        return null;
    }

    return (
        isLoading && (
            <div
                style={{
                    zIndex: 100,
                }}
                className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[var(--background-color)]"
            >
                <Loading />
            </div>
        )
    );
};

export default NavigationEvents;