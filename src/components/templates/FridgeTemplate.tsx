interface FridgeTemplateProps {
  header: React.ReactNode;
  form: React.ReactNode;
  itemList: React.ReactNode;
  modal: React.ReactNode;
}

export const FridgeTemplate = ({ header, form, itemList, modal }: FridgeTemplateProps) => (
  <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      {header}
      <div>
        {form}
        {itemList}
      </div>
    </main>
    {modal}
  </div>
);
