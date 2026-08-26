import json
import requests


def test_verifythatapireturnsforbiddenstatususerapproval_api4160(api_config, auth_headers):
    url = api_config["base_url"].rstrip("/") + "/login"
    headers = {**auth_headers, **{}}
    params = {}
    response = requests.request(
        "POST",
        url,
        headers=headers,
        params=params,
        json=None,
        timeout=30,
    )

    assert response.status_code == 400
    assert response.text is not None
