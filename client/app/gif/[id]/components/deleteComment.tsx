import { Dialog, Portal, Button, CloseButton, Text } from "@chakra-ui/react";

export function DeleteComment({
  commentId,
  fetchComments,
}: {
  commentId: string;
  fetchComments: () => void;
}) {
  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3001/api/comments/${commentId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      fetchComments();
    } else {
      console.error("Failed to delete comment:", response.statusText);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Text cursor={"pointer"} fontSize={"xs"}>
          Delete
        </Text>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete Comment</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Are you sure you want to delete this comment?
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="xs" />
              </Dialog.CloseTrigger>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={"red"} onClick={handleDelete}>
                Delete
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
