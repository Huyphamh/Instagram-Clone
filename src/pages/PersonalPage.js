import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PersonalPage = () => {
    const [params] = useSearchParams();
  const fullname = params.get("id");
  console.log(fullname);
    return (
        <div>
            <h1>Đây là trang của </h1>
            <h1>Đây là trang của </h1>
            <h1>Đây là trang của </h1>
            <h1>Đây là trang của </h1>

        </div>
    );
};

export default PersonalPage;