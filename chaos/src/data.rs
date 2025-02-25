use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

// Calculate sums and return response
pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    let mut string_len = 0;
    let mut int_sum = 0;

    for item in &request.data {
        match item {
            DataItem::String(s) => {
                string_len += s.chars().count();
            }
            DataItem::Int(i) => {
                int_sum += i;
            }
        }
    }

    let response = DataResponse {
        string_len,
        int_sum,
    };
    
    (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
pub struct DataRequest {
    data: Vec<DataItem>,
}

#[derive(Deserialize)]
#[serde(untagged)]
enum DataItem {
    String(String),
    Int(i64),
}

#[derive(Serialize)]
pub struct DataResponse {
    string_len: usize,
    int_sum: i64,
}
