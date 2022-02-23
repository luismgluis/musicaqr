export type FireDoc =
  | FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;
