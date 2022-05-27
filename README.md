I've learned basics of how to work with docker and kubernetes with node, and how to implement microservices with node. (This one is not completed app)

Have to create "jwt-secret" and "stripe-secret" in secrets

kubectl create secret generic (name_of_secret) --from-literal=(KEY_value here)=(your key here)

### E.x
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=(secret here)
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=(secret here)