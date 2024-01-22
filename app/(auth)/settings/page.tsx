'use client';
import SectionHeading from '@/components/layout/SectionHeading'
import SectionSubHeading from '@/components/layout/SectionSubHeading'
import { useAuth } from '@/core/lib/database/auth'
import React, { useState, useEffect } from 'react'

export default function SettingsPage() {
    const [user, setUser] = useState(null)
    const auth = useAuth()

    useEffect(() => {
        setUser(auth.user)
    }, [auth.user])

    console.log(auth)

    const partOfTheDay = () => {
        const date = new Date();
        const hours = date.getHours();

        const emojis = {
            morning: '☕',
            afternoon: '🌞',
            evening: '🌙',
        };

        if (hours < 12) {
            return { greeting: 'Good morning', emoji: emojis.morning };
        } else if (hours >= 12 && hours < 17) {
            return { greeting: 'Good afternoon', emoji: emojis.afternoon };
        } else {
            return { greeting: 'Good evening', emoji: emojis.evening };
        }
    }

    const { greeting, emoji } = partOfTheDay();

    return (
        <section className="container items-center gap-6 !p-0 md:grid ">
            <div className="space-y-2">
                <SectionHeading
                    iconBehind
                    title={`${greeting}, ${user ? user.displayName : 'guest'}!`}
                    icon={<span className="mr-1">{emoji}</span>}
                />
                <SectionSubHeading>
                    <p className="dark:text-neutral-400">
                        Feel free to upload a custom profile picture or change your name, free of charge.
                    </p>
                </SectionSubHeading>
            </div>
        </section>
    )
}
