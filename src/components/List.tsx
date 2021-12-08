import React from "react";

interface IList {
  title?: string;
}

const List: React.FC<IList> = (props) => {
  const { title } = props;
  return (
    <div className="flex flex-col w-full">
      {title && (
        <h3 className="text-blue-500 font-semibold text-lg text-center mb-4">
          {title}
        </h3>
      )}
      {props.children}
    </div>
  );
};

export default List;

// back up
// {items.length !== 0 &&
//   items.map(({ name, id, photo_url }) => (
//     <div
//       className={`${selectable && "flex items-baseline"} mb-1`}
//       key={id}
//     >
//       <ActionItem
//         text={name}
//         handleClick={() => passableFunc({ id, name, img: photo_url })}
//       >
//         <Avatar
//           name={name}
//           image={photo_url?.length === 0 ? null : photo_url}
//         />
//       </ActionItem>
//       {selectable && (
//         <input
//           type="checkbox"
//           className="ml-2"
//           // checked
//           onClick={() => passableFunc({ id, name, img: photo_url })}
//         />
//       )}
//     </div>
//   ))}
