import * as HoverCard from "@radix-ui/react-hover-card";

const HoverModal = ({ children, Icon }) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="bg-white p-4 rounded-full">{Icon}</div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          data-side="bottom"
          side="top"
          className="HoverCardContent z-50 shadow-xl"
          sideOffset={5}
        >
          {children}
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverModal;
