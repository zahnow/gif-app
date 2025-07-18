"use client";

import { useState } from "react";
import { HStack, Button, RatingGroup } from "@chakra-ui/react";

type RatingProps = {
  initialRating?: number;
  onCreate?: (rating: number) => Promise<void>;
  onUpdate?: (rating: number) => Promise<void>;
  onDelete?: () => Promise<void>;
};

const StarRating: React.FC<RatingProps> = ({
  initialRating = 0,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleRate = async (value: number) => {
    if (rating === 0 && onCreate) {
      await onCreate(value);
    } else if (rating !== 0 && onUpdate) {
      await onUpdate(value);
    }
    setRating(value);
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete();
      setRating(0);
    }
  };

  return (
    <HStack>
      <RatingGroup.Root>
        <RatingGroup.Control>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingGroup.Item key={index} index={index + 1}>
              <RatingGroup.ItemIndicator />
            </RatingGroup.Item>
          ))}
        </RatingGroup.Control>
      </RatingGroup.Root>
      {rating > 0 && <Button>Delete Rating</Button>}
    </HStack>
  );
};

export default StarRating;
