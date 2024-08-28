import Container from "@/components/Container/Container";
import { currentSlotId } from "@/redux/features/slot/slotSlice";
import { useAppSelector } from "@/redux/hooks/ReduxHook";

const Booking = () => {
  const slotId = useAppSelector(currentSlotId);
  const 
  return (
    <Container>
      <div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default Booking;
