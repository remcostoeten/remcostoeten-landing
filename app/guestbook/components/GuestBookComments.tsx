import React from 'react';
import Image from 'next/image';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Seperator from '@/components/layout/Seperator';

type GuestbookCommentsProps = {
    avatarSrc: string,
    avatarFallback: string,
    nameHandle: string,
    date: string,
    message: string
    country: string
}

export default function GuestbookComments({ avatarSrc, avatarFallback, nameHandle, date, message, country }: GuestbookCommentsProps) {
    return (
        <div className="grid gap-6">
            <div className="flex items-start gap-4 text-sm">
                <Avatar className="h-10 w-10 border">
                    <AvatarImage alt={avatarFallback} src={avatarSrc} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="font-semibold">{nameHandle} <span className='text-light'>from</span> {country}</div>
                        <time className="text-xs text-gray-500 dark:text-gray-400">{date}</time>
                    </div>
                    <div>{message}</div>
                </div>
            </div>
            <Seperator />
        </div>
    )
}