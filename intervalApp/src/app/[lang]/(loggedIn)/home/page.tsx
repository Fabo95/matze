import { IntervalTimerBlock } from "@Interval/blocks/intervalTimer/intervalTimerBlock";
import { apiGetInterval } from "@Interval/api/api";

export default async function Home() {
    // --- DATA ---

    const interval = await apiGetInterval();

    // --- RENDER ---

    return <IntervalTimerBlock interval={interval} key={JSON.stringify(interval)} />;
}
