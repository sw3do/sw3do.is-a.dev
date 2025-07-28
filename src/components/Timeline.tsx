"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "motion/react";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useTranslation } from "next-i18next";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    const updateHeight = useCallback(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, []);

    useEffect(() => {
        updateHeight();
        
        const resizeObserver = new ResizeObserver(updateHeight);
        if (ref.current) {
            resizeObserver.observe(ref.current);
        }
        
        return () => resizeObserver.disconnect();
    }, [updateHeight]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const memoizedData = useMemo(() => data, [data]);

    return (
        <div
            className="w-full bg-transparent font-sans md:px-10"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-10">
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent from-blue-400 via-cyan-400 to-blue-500">
                            {t('timeline.title')}
                        </h2>
                        <div className="absolute -left-6 top-1/2 w-4 h-0.5 bg-blue-400 opacity-60" />
                        <div className="absolute -right-6 top-1/2 w-4 h-0.5 bg-cyan-400 opacity-60" />
                    </div>
                    <p className="max-w-2xl mx-auto text-gray-400">
                        {t('timeline.subtitle')}
                    </p>
                </div>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-12">
                {memoizedData.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-6 md:pt-20 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md border-2 border-white/20">
                                <div className="h-3 w-3 rounded-full bg-white opacity-80" />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-blue-400">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-blue-400">
                                {item.title}
                            </h3>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                {height > 0 && (
                    <div
                        style={{
                            height: height + "px",
                        }}
                        className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-blue-400/30 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                    >
                        <motion.div
                            style={{
                                height: heightTransform,
                                opacity: opacityTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
