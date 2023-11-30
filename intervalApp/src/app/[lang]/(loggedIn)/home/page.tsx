import { IntervalTimerBlock } from "@Interval/blocks/intervalTimer/intervalTimerBlock";
import { apiGetInterval } from "@Interval/api/api";

export default async function Home() {
    // --- DATA ---

    const interval = await apiGetInterval();

    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("d");
        }, 30000);
    });

    // --- RENDER ---

    return <IntervalTimerBlock interval={interval} key={JSON.stringify(interval)} />;
}
